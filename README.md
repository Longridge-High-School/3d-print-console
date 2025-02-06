# 3D Print Console

**docker-compose.yaml:**
```
services:
  console:
    image:
    volumes:
      - "./data:/www/data:ro"
    ports:
      - "8000:80"
    restart: unless-stopped

  log:
    image:
    volumes:
      - "./data:/data"
    ports:
      - "9000:80"
    restart: unless-stopped

  sftp:
      image: markusmcnugen/sftp
      volumes:
          - ./data:/home/admin/data
      ports:
          - "22:22"
      command: admin:YOUR_PASSWORD_HERE:::data
      restart: unless-stopped

  defaults:
    image:
    volumes:
      - "./data:/data"
```