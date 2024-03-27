defmodule Orcasite.Repo.Migrations.AddUserToDetections do
  @moduledoc """
  Updates resources based on their most recent snapshots.

  This file was autogenerated with `mix ash_postgres.generate_migrations`
  """

  use Ecto.Migration

  def up do
    alter table(:detections) do
      add :user_id, references(:users, column: :id, name: "detections_user_id_fkey", type: :uuid)
    end
  end

  def down do
    drop constraint(:detections, "detections_user_id_fkey")

    alter table(:detections) do
      remove :user_id
    end
  end
end