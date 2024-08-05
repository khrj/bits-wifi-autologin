# autologin

Deno script to autologin to a SOPHOS portal that runs on 172.16.0.30:8090.
Checks https://captive.apple.com every 5s

## Running

set `SOPHOS_USERNAME` and `SOPHOS_PASSWORD` in `.env`.

```env
SOPHOS_USERNAME=yourusername
SOPHOS_PASSWORD=yourpassword
```

then run

```sh
deno run --allow-net --allow-read --allow-env login.ts
```
