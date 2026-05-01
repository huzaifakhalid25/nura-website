import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, total, customerName, city } = body;

    // ==========================================
    // EMAIL NOTIFICATION LOGIC (Web3Forms)
    // ==========================================
    
    // Aapki asli Web3Forms Access Key
    const accessKey = "1e624c05-2fc2-4135-9d8a-31d63bd182f8";
    
    // Email ka khoobsurat text jo aapko aayega
    const emailMessage = `
🚨 NEW ORDER RECEIVED 🚨

Order ID: #NURA-${orderId}
Customer Name: ${customerName}
City: ${city}
Total Amount: Rs. ${total.toLocaleString()}

Please check your Admin Panel for more details.
    `;
    
    // Web3Forms ko email bhejne ka order dena
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `🚨 New Order #NURA-${orderId} from ${customerName}`,
        from_name: "Nura Chocolates Shop",
        message: emailMessage,
      })
    });

    // (Baad mein yahan database ki entry bhi lagayenge)
    
    return NextResponse.json({ success: true, message: "Email notification sent!" });
    
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false, error: "Failed to send notification" }, { status: 500 });
  }
}