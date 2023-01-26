class EnigmasController < ApplicationController
  before_action :set_enigma, only: [:second, :final]

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
      render :index, status: :unprocessable_entity
    end
  end

  def second
  end

  def final
  end

  private

  def set_enigma
    @enigma = Enigma.find(params[:enigma_id])
  end
end
