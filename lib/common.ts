import CryptoJS from 'crypto-js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function verifyZaloPayRes(data: any, mac: any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = {};
    try {
        const newMac = CryptoJS.HmacSHA256(data, process.env.ZALOPAY_KEY2 as string).toString();

        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (mac !== newMac) {
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            // thanh toán thành công
            result.return_code = 1;
            result.return_message = "success";
        }
    } catch (error) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = error;
    }
    return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertZaloResData(data: any) {
    const convertData = JSON.parse(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = JSON.parse(convertData.item).map((i: any) => {
        return {
            productId: i.item,
            quantity: i.quantity,
            color: i.color,
            size: i.size
        }
    })
    const customerInfo = JSON.parse(convertData.embed_data)

    return {
        clerkUserId: convertData.app_user,
        amount: convertData.amount,
        name: customerInfo.customerName,
        address: customerInfo.address,
        email: customerInfo.email,
        phone: customerInfo.phone,
        products: items
    }
}

export const formatCurrencyVND = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // No decimal places
        maximumFractionDigits: 0, // No decimal places
    }).format(amount);
};