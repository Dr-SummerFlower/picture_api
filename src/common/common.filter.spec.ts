import { ArgumentsHost, HttpException } from '@nestjs/common';
import { CommonFilter } from './common.filter';

describe('CommonFilter', () => {
    let filter: CommonFilter;
    let mockHost: ArgumentsHost;
    let mockHttpException: HttpException;

    beforeEach(() => {
        filter = new CommonFilter();
        mockHttpException = new HttpException('Test Exception', 400);
        mockHost = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn().mockReturnValue({
                    url: '/test',
                }),
                getResponse: jest.fn().mockReturnValue({
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis(),
                }),
            }),
            getArgs: jest.fn().mockReturnValue([]) as any,
            getArgByIndex: jest.fn().mockReturnValue(null) as any,
            switchToRpc: jest.fn().mockReturnValue(null as any),
            switchToWs: jest.fn().mockReturnValue(null as any),
            getType: jest.fn().mockReturnValue('http') as any,
        } as ArgumentsHost;
    });

    it('should catch HttpException and return formatted response', () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const mockGetResponseSpy = jest
            .spyOn(mockHost.switchToHttp(), 'getResponse')
            .mockReturnValue(mockResponse);

        filter.catch(mockHttpException, mockHost);

        expect(mockGetResponseSpy).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            code: 400,
            time: expect.any(Date),
            path: '/test',
            message: 'Test Exception',
        });
    });
});
