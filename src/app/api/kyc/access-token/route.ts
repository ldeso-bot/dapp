import { NextResponse } from 'next/server';

const LV_ZKKYC = 1;
const API_MODE_EMAIL = 0;
const ZKME_TOKEN_URL = 'https://nest-api.zk.me/api/token/get';

export async function POST() {
  const apiKey = process.env.ZKME_KYC_API_TOKEN;
  const appId = process.env.NEXT_PUBLIC_ZKME_KYC_APP_ID;

  if (!apiKey || !appId) {
    const missing = [
      !apiKey && 'ZKME_KYC_API_TOKEN',
      !appId && 'NEXT_PUBLIC_ZKME_KYC_APP_ID',
    ].filter(Boolean);
    console.error('[KYC access-token] Missing env:', missing.join(', '));
    return NextResponse.json(
      { error: "We couldn't complete this request. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const body = {
      apiKey: apiKey,
      appId: appId,
      apiModePermission: API_MODE_EMAIL,
      lv: LV_ZKKYC,
    };

    const res = await fetch(ZKME_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = (await res.json()) as {
      code?: number;
      data?: { accessToken?: string } | null;
      msg?: string;
    };

    if (data.code === 80000000 && data.data?.accessToken) {
      return NextResponse.json({ accessToken: data.data.accessToken });
    }

    const message =
      data.msg ?? (res.ok ? 'Invalid token response' : 'Token request failed');
    console.error('[KYC access-token] zkme error:', {
      code: data.code,
      msg: data.msg,
      status: res.status,
    });
    return NextResponse.json(
      { error: message },
      { status: res.ok ? 500 : res.status }
    );
  } catch (err) {
    console.error('[KYC access-token] Request failed:', err);
    return NextResponse.json(
      { error: "We couldn't complete this request. Please try again later." },
      { status: 500 }
    );
  }
}
