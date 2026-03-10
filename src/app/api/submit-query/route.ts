import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, property } = body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: '1QQGhCxtf_usufSZTe7YgoAa2ug4ULq9F_CS8CTGspuw',
      range: 'Queries!A:F',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }), property, name, email, message, 'New Lead']
        ],
      },
    });

    return NextResponse.json({ success: true, message: 'Saved to sheet' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
