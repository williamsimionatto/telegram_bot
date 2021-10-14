import { Telegraf } from 'telegraf'
import rastreamento from './rastreamento'

const bot = new Telegraf('2035921664:AAH0LyJRQ1P1JNEh074oF3AUDBGi53ZDcbs')

bot.start((ctx) => ctx.reply("Hello world"))

bot.command('rastreamento', async (ctx) => {
  try {
    const codRastreamento: string = ctx.update.message.text.split(' ')[1]
    const response = await rastreamento(codRastreamento)
    await ctx.reply(response.join("\n"))
  } catch(error) {
    console.error(error)
  }
})

bot.launch()