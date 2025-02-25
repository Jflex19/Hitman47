import { BaseCommand, Command, Message } from '../../Structures'
import { AnyMessageContent } from '@whiskeysockets/baileys'

@Command('support', {
    description: 'the bot sends the support links to your pm.',
    category: 'general',
    usage: 'support',
    cooldown: 10,
    exp: 10,
    dm: true
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        let url!: string
        let text = '*📮SUPPORT GROUP LINKS*\n\n'
        const { supportGroups } = this.client.config
        for (let i = 0; i < supportGroups.length; i++) {
            const { subject } = await this.client.groupMetadata(supportGroups[i])
            const code = await this.client.groupInviteCode(supportGroups[i])
            text += `*#${i + 1}*\n*${subject}:* *https://chat.whatsapp.com/${code}*\n`
            if (!url) url = `https://chat.whatsapp.com/${code}`
        }
        await this.client.sendMessage(M.sender.jid, {
            text
        } as unknown as AnyMessageContent)
        return void M.reply('📪Sent the support group links in your DM.')
    }
}
