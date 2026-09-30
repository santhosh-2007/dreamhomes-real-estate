
$ErrorActionPreference = "Stop"

$ProjectPath = "C:\Users\hp\OneDrive\Desktop\real-estate-property-catalog"
$ImageName = "dreamhomes:latest"
$ContainerName = "dreamhomes-container"

Set-Location $ProjectPath

Write-Host "Building DreamHomes Docker image..."
docker build -t $ImageName .
if ($LASTEXITCODE -ne 0) {
    throw "Docker image build failed."
}

Write-Host "Removing old DreamHomes container..."
docker rm -f $ContainerName 2>$null

Write-Host "Starting updated DreamHomes container..."
docker run -d --name $ContainerName --restart unless-stopped -p 8080:80 $ImageName
if ($LASTEXITCODE -ne 0) {
    throw "Docker container startup failed."
}

Write-Host "Deployment completed!"
Write-Host "Website: http://localhost:8080"