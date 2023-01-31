class TilesController < ApplicationController

  def create
    @enigma = Enigma.find(params[:enigma_id])
    @enigma.tiles.destroy_all
    @count = 1

    9.times do
      @tile = Tile.create(enigma_id: @enigma.id, position: @count, image: "heart-transformed#{@count}.png")
      @count += 1
    end

    redirect_to enigma_final_path(@enigma)
  end

  def sort
    @tiles_sorted = params[:tileOrdered].split(",").map { |id| Tile.find(id.to_i)}

    @tiles_sorted.each_with_index do |t, index|
      t.position = index + 1
      t.save
    end
  end

  # private

  # def params_tile
  #   params.require(:tile).permit(:enigma_id)
  # end
end
