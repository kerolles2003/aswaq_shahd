import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://qrcode-asaq-shahd.vercel.app/"
output_path = "assets/img/website_qr.png"

try:
    urllib.request.urlretrieve(url, output_path)
    print("QR Code downloaded successfully.")
except Exception as e:
    print(f"Error downloading QR code: {e}")
