if @chat.persisted?
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: Chat.new})
  json.inserted_message render(partial: "shared/new_message", formats: :html, locals: {c: @chat})

  if @chat.content.downcase == 'rien'
    json.inserted_bot_message render(partial: "shared/chatbot_correct_answer", formats: :html, locals: {chat_bot: @chat_bot})
  else
    json.inserted_bot_message render(partial: "shared/chatbot_answer", formats: :html, locals: {chat_bot: @chat_bot})
  end

else
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: @chat})
end
