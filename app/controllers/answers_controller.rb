require 'json'
require 'net/http'

class AnswersController < ApplicationController
  before_action :set_enigma, only: [:first, :welldone, :create]

  def first
    @enigma = Enigma.find(params[:enigma_id])
    @answer = Answer.new
  end

  def welldone
    @answers = @enigma.answers
  end

  def create
    @answer = Answer.new(params_answer)

    @user_answer = params['answer']['content']
    @valid_answers = ["please", "stp", 'svp', "s'il te plait", "s'il te plaît", "s il te plait", "s il te plaît", "s'il-te-plait", "s'il-te-plaît"]
    @answer.enigma = @enigma

    @valid_answers.each do |valid_answer|
      if @user_answer.include?(valid_answer)
        return redirect_to enigma_second_path(@enigma) if @answer.save
      end
    end

    perspective_API(@user_answer)
    @user_answer_score = @result['attributeScores']['TOXICITY']['summaryScore']['value']
    @compliment_score = 0.01

    if @user_answer_score < @compliment_score
      return redirect_to enigma_second_path(@enigma) if @answer.save
    else
      return render :new unless @answer.save
    end
  end

  private

  def params_answer
    params.require(:answer).permit(:content)
  end

  def set_enigma
    @enigma = Enigma.find(params[:enigma_id])
  end

  def perspective_API(user_answer)
    api_key = ENV['API_KEY']
    uri = URI("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=#{api_key}")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request.body = {
      comment: { text: user_answer },
      languages: ['fr'],
      requestedAttributes: { TOXICITY: {} }
    }.to_json

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    response = http.request(request)

    @result = JSON.parse(response.body)
  end
end
