import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "fallback_secret_kode";

export async function POST(req: Request) {
  try {
    const { email: identifier, password } = await req.json();
const user = await prisma.user.findFirst({
  where: {
    OR: [
      { email: identifier },
      { username: identifier }
    ]
  }
});

if (!user) {
  return NextResponse.json({ message: "Akun tidak ditemukan" }, { status: 401 });
}
    // cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Password salah" }, { status: 401 });
    }

    // Buat Token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username }, 
      SECRET_KEY, 
      { expiresIn: "1h" }
    );

    const response = NextResponse.json({ message: "Login Berhasil" }, { status: 200 });

    // 4. Simpan di HttpOnly Cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 3600,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}