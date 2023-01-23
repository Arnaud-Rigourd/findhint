class EnigmasController < ApplicationController

  def index
  end

  def new
    @enigma = Enigma.new
  end

  def create
    @enigma = Enigma.new(params_enigma)
    @valid_answers = ["please", "stp", "s'il te plait", "s'il te plaît", "s il te plait", "s il te plaît", "s'il-te-plait", "s'il-te-plaît"]

    @count = 1
    @valid_answers.each do |valid_answer|
      if params['enigma']['answer'].include?(valid_answer)
        return redirect_to second_enigmas_path if @enigma.save
      end
    end

    return render :new unless @enigma.save

  end

  def second
  end

  private

  def params_enigma
    params.require(:enigma).permit(:answer)
  end
end
