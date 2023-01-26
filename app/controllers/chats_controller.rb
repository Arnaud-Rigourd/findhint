class ChatsController < ApplicationController
  before_action :set_enigma, only: [:welldone, :create]

  def welldone
    @chats = @enigma.chats
    @chat = Chat.new
    @chat_bots = @chats.where(origin: false)
  end

  def create
    @chat = Chat.new(params_chat)
    @chat.enigma = @enigma

    if @chat.save
      @chat_bot_answers = ["Ce n'est malheureusement pas la bonne réponse", "Bien essayé, mais ce n'est pas ça", "Désolé, mais ce n'est pas la réponse", "Tu as pensé à chercher sur Google ?", "Ce n'est pas ca, mais je te donne un indice : la réponse tient en quatre lettres"]

      if @chat.content.downcase == 'rien'
        @chat_bot = Chat.create(content: "Bravo ! Tu as trouvé champion !", origin: false, enigma_id: @enigma.id)
      else
        @chat_bot = Chat.create(content: @chat_bot_answers.sample, origin: false, enigma_id: @enigma.id)
      end
      redirect_to welldone_enigma_chats_path(@enigma)
    else
      render :welldone
    end
  end

  private

  def params_chat
    params.require(:chat).permit(:content)
  end

  def set_enigma
    @enigma = Enigma.find(params[:enigma_id])
  end
end
