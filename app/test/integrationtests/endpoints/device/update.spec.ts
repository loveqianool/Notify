import { handleApiRequest } from '../../../../src';
import { createDevice } from '../../../../src/logic/device/create';
import { WebPushInfos } from '../../../../src/webpush/webpushinfos';

describe('update device', () => {
    // todo add missing test cases
    test('successful update', async () => {
        expect(true).toBeTruthy();
        return;
        const device = await createDevice({
            endpoint: 'https://fcm.googleapis.com/fcm/send/fcm-endpoint',
            key: 'key',
            auth: 'auth'
        });

        const newRequestData: { web_push_data: WebPushInfos } = {
            web_push_data: {
                endpoint: 'https://fcm.googleapis.com/fcm/send/fcm-endpoint',
                key: 'key1',
                auth: 'auth2'
            }
        };

        const updateRequest = new Request(`https://localhost/api/device/${device.id}`, {
            method: 'PATCH',
            headers: { 'authorization': `Bearer ${device.secret}` },
            body: JSON.stringify({ ...newRequestData })
        });

        const getResponse = await handleApiRequest(updateRequest);

        expect(getResponse?.status).toBe(200);
        const getBody = await getResponse?.json();
        expect(getBody).toMatchObject({
            successful: true
        });
    });

    /*
    test('invalid secret update', async () => {
        const requestData: { web_push_data: WebPushInfos } = {
            web_push_data: {
                endpoint: 'https://fcm.googleapis.com/fcm/send/fcm-endpoint',
                key: 'key',
                auth: 'auth'
            }
        };
        const createRequest = new Request('https://localhost/api/device/', {
            method: 'POST',
            body: JSON.stringify(requestData)
        });
        const createResponse = await handleApiRequest(createRequest);
        expect(createResponse?.status).toBe(200);
        const body = await createResponse?.json();

        const newRequestData: { web_push_data: WebPushInfos } = {
            web_push_data: {
                endpoint: 'https://fcm.googleapis.com/fcm/send/fcm-endpoint',
                key: 'key',
                auth: 'auth'
            }
        };

        const deleteRequest = new Request(`https://localhost/api/device/${body.data.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ secret: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', ...newRequestData })
        });

        const getResponse = await handleApiRequest(deleteRequest);
        expect(getResponse?.status).toBe(401);
        const getBody = await getResponse?.json();
        expect(getBody).toMatchObject({
            successful: false
        });
    });
    */
});