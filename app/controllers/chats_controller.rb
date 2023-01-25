class ChatsController < ApplicationController
  before_action :set_enigma, only: [:welldone, :create]

  def welldone
    @chats = @enigma.chats
    @chat = Chat.new
  end

  def create
    @chat = Chat.new(params_chat)
    @chat.enigma = @enigma

    if @chat.save
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
