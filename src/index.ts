import { Telegraf } from 'telegraf'
import app from './status'

const bot = new Telegraf('2035921664:AAH0LyJRQ1P1JNEh074oF3AUDBGi53ZDcbs')

bot.start((ctx) => ctx.reply("Hello world"))
bot.command('status', async (ctx) => {
  try {
    const response = await app()

    if (response.status == 200) {
      await ctx.reply(`Google service: ✅`)
    } else {
      await ctx.reply(`Google service: ❌`)
    }
  } catch(error) {
    console.error(error)
  }
})

bot.launch()