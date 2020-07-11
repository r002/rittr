Write-Host "Reset the Rittr db with this ps1 script."
Invoke-Expression "cmd /c 'psql -U rittr rittr_dev < db/seed.sql'"
