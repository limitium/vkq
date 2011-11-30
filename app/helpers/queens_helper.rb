module QueensHelper
  def name_link(queen)
    link_to "#{queen.first_name} #{queen.nickname} #{queen.last_name}", queen_show_path(queen), :class => "name name_#{queen._id}"
  end

  def city_link(queen)
    link_to queen.city_name, queens_list_path(:city=>queen.city), :class => "name_#{queen.city}"
  end

  def university_link(queen)
    link_to queen.university_name, queens_list_path(:university=>queen.university), :class => "name_#{queen.university}"
  end

  def faculty_link(queen)
    link_to queen.faculty_name, queens_list_path(:faculty=>queen.faculty), :class => "name_#{queen.faculty}"
  end

  def ava_link(queen, html_options = {}, photo = "photo_rec")
    link_to(image_tag(queen[photo], :alt => "#{queen.first_name} #{queen.last_name}", :class => " #{photo}_#{queen._id}"), queen_show_path(queen), html_options)
  end

  def ava_link_by_rating(queen, index, html_options={})
    photo = "photo_rec"
    if index < 3
      photo = "photo_medium_rec"
      html_options[:class] = "position_#{index+1}"
    end
    ava_link queen, html_options, photo
  end
end
