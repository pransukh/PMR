param (
    [Parameter(Mandatory = $true)]
    [string]$Location,

    [Parameter(Mandatory = $true)]
    [string]$ComponentName
)

function To-PascalCase($text) {
    # Split by non-alphanumeric, capitalize each part, join
    return ($text -split '[-_\s]+' | ForEach-Object {
        if ($_ -ne "") {
            $_.Substring(0,1).ToUpper() + $_.Substring(1)
        }
    }) -join ''
}

$PascalName = To-PascalCase $ComponentName

# Ensure the target directory exists
if (!(Test-Path -Path $Location)) {
    Write-Host "Location does not exist. Creating it..."
    New-Item -ItemType Directory -Path $Location | Out-Null
}

# Build component folder path
$componentFolder = Join-Path $Location $ComponentName

# Create component folder
if (!(Test-Path -Path $componentFolder)) {
    New-Item -ItemType Directory -Path $componentFolder | Out-Null
    Write-Host "Created folder: $componentFolder"
} else {
    Write-Host "Folder already exists: $componentFolder"
}

# File names
$tsFile   = Join-Path $componentFolder "$ComponentName.component.ts"
$htmlFile = Join-Path $componentFolder "$ComponentName.component.html"
$cssFile  = Join-Path $componentFolder "$ComponentName.component.css"

# Create empty HTML & CSS files
New-Item -ItemType File -Path $htmlFile -Force | Out-Null
New-Item -ItemType File -Path $cssFile -Force | Out-Null

# TS content (Angular component template)
$tsContent = @"
import { Component } from "@angular/core";

@Component({
    standalone: true,
    selector: "ht-$ComponentName",
    templateUrl: "./$ComponentName.component.html",
    styleUrl: "./$ComponentName.component.css"
})

class $PascalName {

}

export default $PascalName;
"@

# Write TS file content
Set-Content -Path $tsFile -Value $tsContent -Encoding UTF8

Write-Host "Component '$PascalName' created successfully in $componentFolder"