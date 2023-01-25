class ChatsController < ApplicationController

  def welldone
    @enigma = Enigma.find(params[:enigma_id])
    @chats = @enigma.chats
  end
end
