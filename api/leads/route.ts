import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('leads')
      .insert([{
        nome: body.nome,
        cpf: body.cpf,
        whatsapp: body.whatsapp,
        valor: body.valor,
        parcelas: 24,
        tipo: "Novo Crédito",
        beneficio: "Não informado",
        status: "novo"
      }]);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}