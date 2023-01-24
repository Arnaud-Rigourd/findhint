require 'json'
require 'net/http'

class EnigmasController < ApplicationController

  def index
  end

  def new
    @enigma = Enigma.new
  end

  def create
    @enigma = Enigma.new(params_enigma)
    @answer = params['enigma']['answer']
    @valid_answers = ["please", "stp", "s'il te plait", "s'il te plaît", "s il te plait", "s il te plaît", "s'il-te-plait", "s'il-te-plaît"]

    @valid_answers.each do |valid_answer|
      if @answer.include?(valid_answer)
        return redirect_to second_enigmas_path if @enigma.save
      end
    end

    perspective_API(@answer)
    @answer_score = @result['attributeScores']['TOXICITY']['summaryScore']['value']
    @compliment_score = 0.01

    if @answer_score < @compliment_score
      return redirect_to second_enigmas_path if @enigma.save
    else
      return render :new unless @enigma.save
    end

  end

  def second
  end

  private

  def params_enigma
    params.require(:enigma).permit(:answer)
  end

  def perspective_API(answer)
    api_key = ENV['API_KEY']
    uri = URI("https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=#{api_key}")
    request = Net::HTTP::Post.new(uri)
    request.content_type = "application/json"
    request.body = {
      comment: { text: answer },
      languages: ["fr"],
      requestedAttributes: {TOXICITY: {}}
    }.to_json

    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    response = http.request(request)

    @result = JSON.parse(response.body)
  end

  def toxicity(answer_score)
    @bot_usual_answer = "Ce n'est pas vraiment un compliment..."

    if answer_score < @compliment.last
      return true
    else
      return @bot_toxic_answer
    end
  end

end
