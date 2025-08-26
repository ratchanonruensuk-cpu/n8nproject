import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);

        const response = await fetch('https://automate-n8n.softway.co.th/webhook-test/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: hashedPassword }),
        });
        const data = await response.json();
        if (!response.ok) {
            setError(data.message || 'เกิดข้อผิดพลาดในการล็อกอิน');
        } else {
            console.log('Login success:', data);
            // ตัวอย่าง: redirect หรือเก็บ token
            // router.push('/dashboard')
        }

    } catch (error) {

        return NextResponse.json({ message: "An error occured while registering the user." }, { status: 500 })

    }

}