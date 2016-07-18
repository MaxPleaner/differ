module UpdateCaches
  included do
    has_many(:update_caches,
      class_name: "UpdateCache",
      foreign_key: :user_id,
      primary_key: :id
    )
  end

  def send_to_update_cache(record, is_delete=false)
    record_type = record.class.to_s.underscore
    record_id = record.id
    existing_cache_item = update_caches.where(record_type: record_type, record_id: record_id)
    if is_delete
      existing_cache_item.destroy
      add_destroy_cmd_to_update_cache(record_type, record_id, record)
    elsif existing_cache_item
      existing_cache_item.update(record_data: record.attributes.to_json)
    else
      add_create_cmd_to_update_cache(record_type, record_id, record)
    end
  end

  def add_destroy_cmd_to_update_cache(*args)
    add_create_cmd_to_update_cache(*(args + [is_delete=true]))
  end

  def add_create_cmd_to_update_cache(record_type, record_id, record, is_delete=false)
      update_caches.create(record_type: record_type, record_id: record_id, record_data: record.attributes.to_json, is_delete: is_delete)    
  end
end
