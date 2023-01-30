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
    @chats = @enigma.chats

    respond_to do |format|

      if @chat.save
        @chat_bot_answers = ["Ce n'est malheureusement pas la bonne réponse. Les images peuvent te mettre sur la voie", "Bien essayé, mais ce n'est pas ça", "Désolé, mais ce n'est pas la réponse", "Si tu ne trouves pas, c'est rien. As-tu pensé à chercher sur Google ?", "Ce n'est pas ca, mais je te donne un indice : la réponse tient en quatre lettres"]

        format.html {
          if @chat.content.downcase == 'rien'
            @chat_bot = Chat.create(content: "Bravo, tu as trouvé ! 🎉🎉🎉 Tu peux désormais passer à la dernière épreuve en cliquant sur le bouton qui vient d'apparaître !", origin: false, enigma_id: @enigma.id)
          else
            @chat_bot = Chat.create(content: @chat_bot_answers.sample, origin: false, enigma_id: @enigma.id)
          end
          redirect_to welldone_enigma_chats_path(@enigma)
        }
        format.json
      else
        format.html {
          render :welldone, status: :unprocessable_entity
        }
        format.json
      end

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
