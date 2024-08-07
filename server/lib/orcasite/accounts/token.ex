defmodule Orcasite.Accounts.Token do
  use Ash.Resource,
    domain: Orcasite.Accounts,
    data_layer: AshPostgres.DataLayer,
    extensions: [AshAuthentication.TokenResource],
    authorizers: [Ash.Policy.Authorizer]

  token do
    domain Orcasite.Accounts
  end

  postgres do
    table "tokens"
    repo Orcasite.Repo
  end

  policies do
    bypass AshAuthentication.Checks.AshAuthenticationInteraction do
      authorize_if always()
    end
  end
end
