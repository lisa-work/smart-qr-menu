import { useEffect, useState } from "react";
import qrService from "@/services/qr";
import { useParams } from "react-router-dom";

function QRPage() {
    const [loading, setLoading] = useState(false);
    const [qrCode, setQRCode] = useState<string | null>(null);
    
    const { slug } = useParams();

    useEffect(() => {
        if (!slug) {
            throw new Error("Slug is required to generate QR code.");
        }
        const fetchQRCode = async () => {
            try {
                setLoading(true);
                const response = await qrService.getQRCode(slug);
                // assume the API returns the image data or URL in response.data
                setQRCode(response.qr);
            } catch (error) {
                console.error("Error fetching QR code:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQRCode();
    }, [slug]);

    if (!slug) {
        return <p>Restaurant not found.</p>;
    }

    return (
        <div>
                {loading && <p>Loading...</p>}
                {!loading && qrCode && (
                    <div>
                        <img src={qrCode} alt="QR Code" />
                        <a href={qrCode} download={`qr-code-${slug}.png`}>
                            Download QR Code
                        </a>
                </div>
                )}

        </div>
    )
}

export default QRPage