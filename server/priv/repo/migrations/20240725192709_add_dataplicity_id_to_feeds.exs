defmodule Orcasite.Repo.Migrations.AddDataplicityIdToFeeds do
  @moduledoc """
  Updates resources based on their most recent snapshots.

  This file was autogenerated with `mix ash_postgres.generate_migrations`
  """

  use Ecto.Migration

  def up do
    alter table(:feeds) do
      add :dataplicity_id, :text
    end

    create index(:feeds, [:dataplicity_id])
  end

  def down do
    drop_if_exists index(:feeds, [:dataplicity_id])

    alter table(:feeds) do
      remove :dataplicity_id
    end
  end
end
