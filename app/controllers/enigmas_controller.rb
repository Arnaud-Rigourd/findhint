class EnigmasController < ApplicationController

  def index
  end

  # def new
  #   @enigma = Enigma.new
  # end

  def create
    @enigma = Enigma.new(origin: 'index')

    if @enigma.save
      redirect_to first_enigma_answers_path(@enigma)
    else
      render :index
    end
  end

  def second
    @enigma = Enigma.find(params[:enigma_id])
  end

  def welldone

  end

  private

  # def params_enigma
  #   params.require(:enigma).permit(:answer)
  # end
end
