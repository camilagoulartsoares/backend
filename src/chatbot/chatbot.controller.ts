import { Controller, Get, Query } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

interface Startup {
  nome_da_startup: string
  vertical?: string
  localizacao?: string
  [key: string]: any
}

type RespostaBot =
  | { tipo: 'erro'; resposta: string }
  | { tipo: 'nenhum_resultado'; resposta: string }
  | { tipo: 'resultado'; resposta: Startup[] }

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async responder(@Query('mensagem') mensagem: string): Promise<RespostaBot> {
    const resposta = await firstValueFrom(
      this.httpService.get(
        'https://make.investidores.vc/webhook/03ac72cf-2cf2-40d2-86ac-be411e3be742/startups',
        {
          headers: {
            'Content-Type': 'application/json',
            api_key: 'alkj239j9csdociva-av98n2vsdoia-asoijf20as',
          },
        },
      ),
    )

    const data = resposta.data

    if (!Array.isArray(data)) {
      return {
        tipo: 'erro',
        resposta: 'A resposta da API não é uma lista válida.',
      }
    }

    const texto = mensagem.toLowerCase()
    let resultado: Startup[] = []

    if (texto.includes('fintech')) {
      resultado = data.filter((s: Startup) =>
        s.vertical?.toLowerCase().includes('fintech'),
      )
    } else if (texto.includes('são paulo')) {
      resultado = data.filter((s: Startup) =>
        s.localizacao?.toLowerCase().includes('são paulo'),
      )
    } else if (
      texto.includes('me mostra') ||
      texto.includes('quero saber sobre') ||
      texto.includes('quero ver')
    ) {
      const palavras = texto
        .replace('me mostra', '')
        .replace('quero saber sobre', '')
        .replace('quero ver', '')
        .trim()

      resultado = data.filter((s: Startup) =>
        s.nome_da_startup?.toLowerCase().includes(palavras),
      )
    }

    if (!resultado.length) {
      return {
        tipo: 'nenhum_resultado',
        resposta: `Não encontrei nenhuma startup relacionada a "${mensagem}". Tente buscar por nome, vertical ou localização.`,
      }
    }

    return {
      tipo: 'resultado',
      resposta: resultado,
    }
  }
}
