if @chat.persisted?
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: Chat.new})
  json.inserted_message render(partial: "shared/new_message", formats: :html, locals: {c: @chat})

  if @chat.content.downcase.gsub(/[\s\W]/, '') == 'rien'
    json.inserted_bot_message render(partial: "shared/chatbot_correct_answer", formats: :html, locals: {chat_bot: @chat_bot})
    json.inserted_button render(partial:"shared/next_stage_btn_ajax", formats: :html, locals: {enigma: @enigma})

  elsif @chat.content.downcase.include?('homme') || @chat.content.downcase.include?('vie') || @chat.content.downcase.include?('enfant') || @chat.content.downcase.include?('femme') || @chat.content.downcase.include?('humain')

    @chat_bot = Chat.create(content: "C'est très intéressant, mais est-ce qu'on meurt vraiment si on en mange ?", origin: false, enigma_id: @enigma.id)

    json.inserted_close_answer render(partial:"shared/close_answer", formats: :html, locals: {chat_bot: @chat_bot})

  else
    json.inserted_bot_message render(partial: "shared/chatbot_answer", formats: :html, locals: {chat_bot: @chat_bot})
  end

else
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: @chat})
end
