import QRCode from "qrcode";

export const getQRCode = async (url: string) => {
    return await QRCode.toDataURL(url, {

        width: 500,

        margin: 2,

        color: {

            dark: "#000000",

            light: "#FFFFFF"

        }
    });
}