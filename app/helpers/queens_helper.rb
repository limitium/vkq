module QueensHelper
  def name_link(queen)
    link_to "#{queen.first_name} #{queen.nickname} #{queen.last_name}", queen_show_path(queen)
  end

  def ava_link(queen, photo = "photo_rec")
    link_to(image_tag(queen[photo], :alt=>"#{queen.first_name} #{queen.last_name}"), queen_show_path(queen))
  end
end
