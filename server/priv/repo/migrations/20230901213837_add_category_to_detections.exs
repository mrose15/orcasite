defmodule Orcasite.Repo.Migrations.AddCategoryToDetections do
  @moduledoc """
  Updates resources based on their most recent snapshots.

  This file was autogenerated with `mix ash_postgres.generate_migrations`
  """

  use Ecto.Migration

  def up do
    alter table(:detections) do
      add :category, :text
    end
  end

  def down do
    alter table(:detections) do
      remove :category
    end
  end
end