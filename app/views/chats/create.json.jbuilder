if @chat.persisted?
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: Chat.new})
  json.inserted_message render(partial: "shared/new_message", formats: :html, locals: {c: @chat})
else
  json.form render(partial: "shared/form_chat", formats: :html, locals: {enigma: @enigma, chat: @chat})
end
