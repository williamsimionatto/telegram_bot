import axios from 'axios'

interface iconyOptions {
  [key: string]: string
}

const iconByStatus: iconyOptions = {
	'TRANSITO': '🚚',
	'SAIU-ENTREGA-DESTINATARIO': '🙌',
	'ENTREGUE': '🎁',
	'RecebidoCorreiosBrasil': '🛬',
	'POSTAGEM': '📦',
	'DEFAULT': '🚧',
}

function getIcon(status: string): any {
	return iconByStatus[status] || iconByStatus.DEFAULT;
}

async function getData(code: string): Promise<any> {
	const url = 'https://rastreamento.correios.com.br/app/resultado.php';
  let data
	await axios.get(`${url}?objeto=${code}&mqs=S`)
    .then((result: any) => {
      if (result.data.erro) {
        return { erro: true }
      }

      data = result.data
    })

    return data;
}

async function rastreamento(codRastreamento: string): Promise<any> {
  try {
    const rastreamentoTrack: string[] = []
    const data = await getData(codRastreamento.toUpperCase());

    if (!data) {
      rastreamentoTrack.push(`❌ Ocorreu um erro!`)

      return rastreamentoTrack
    }

    const events = data.eventos || []
    events.map((event: any) => {
      const { descricao, descricaoWeb, dtHrCriado, unidade, unidadeDestino } = event;
      rastreamentoTrack.push(`==> ${getIcon(descricaoWeb)} ${descricao}`)
      rastreamentoTrack.push(`\t\t\tData: ${dtHrCriado}`)
      rastreamentoTrack.push(`\t\t\tLocal: ${unidade.nome}`)

      if (unidadeDestino) {
        rastreamentoTrack.push(`\t\t\tIndo para: ${unidadeDestino?.nome}`)
      }
    });

    return rastreamentoTrack
  } catch (error) {
    return error;
  }
}

export default rastreamento
