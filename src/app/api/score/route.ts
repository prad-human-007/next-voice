import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(request: NextRequest) {
    try {
        const data = await request.text();
        console.log(data);
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: data,
                },
            ],
        });
        
        const message = completion.choices[0].message.content;
        // console.log(message);

        return NextResponse.json({ message });
    } catch (error) {
        return NextResponse.json({ message: 'Error processing request', error }, { status: 500 });
    }
}