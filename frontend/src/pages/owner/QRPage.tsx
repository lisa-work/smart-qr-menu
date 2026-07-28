import { useEffect, useState } from "react";
import qrService from "@/services/qr";
import { useParams } from "react-router-dom";
import { QRLayout } from "@/components/layout";
import { Button } from "@/components";

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
                    <QRLayout title="QR Code" subtitle="Print this QR code so customers can scan and view your menu">
                        <div className="flex flex-col items-center justify-center space-y-4 mx-auto px-auto">
                            <img src={qrCode} alt="QR Code" 
                            className="mx-auto border rounded-lg shadow-md hover:shadow-lg p-3 size-60 md:size-80" />
                            <div className="flex flex-row gap-2">
                                <Button className="bg-white text-black hover:text-white hover:font-bold rounded-sm">
                                    <a href={qrCode} download={`qr-code-${slug}.png`}>
                                        Download QR Code
                                    </a>
                                </Button>
                                <Button className="rounded-sm cursor-pointer">
                                    <a>
                                        Preview Menu
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </QRLayout>
                )}

        </div>
        
    )
}

export default QRPage