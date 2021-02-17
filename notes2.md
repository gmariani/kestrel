https://www.youtube.com/watch?v=x_EEwGe-a9o

Amazon Fire TV runs Chrome 84
https://www.whatismybrowser.com/w/235N8D3

https://developer.amazon.com/docs/fire-tv/supporting-controllers-in-web-apps.html

Install create-react-app
Install firebase
Install normalize.css
Create global styles:

Media Structure
- Initial folders determine the main categories
  - /animation
  - /tv
  - /kids
- Within each category folder, there must be a folder for each series/movie
  - /the office
  - /iron man
- Within each series/movie folder you can have a background.jpg/png file for the details page background. You can also have a poster.jpg/png file for the browse page poster image.
- For series folders, you must have a folder for each season (or extras). The name format should be "## - Name". This will determine the order they show up and the label used. (Maybe allow any name and just have an index.json file?)
- For season folders, you may have a background.jpg/png to override the series image. For each MP4 you may also have a *.vtt file of the same name for subtitles. You may also have a *.jpg/png of the same name for a thumbnail of that episode. If no thumbnail is provided, one can be searched for on TMDB if an ID was provided for the series.


-------------------------------

Step 1: Find the subtitle tracks
mkvmerge -i "Gunbuster - 02.mkv"
Step 2: Extract the subtitles
mkvextract tracks "Gunbuster - 02.mkv" 4:"Gunbuster - 02.ssa" #:name.ssa
Step 3: Convert the .ssa to .vtt
https://subtitletools.com/convert-to-vtt-online
Step 4: Convert the MKV to MP4

mkvmerge -i "Gunbuster 2 - 01 - Please Let Me Call You Big Sister!.mkv"
mkvmerge -i "Gunbuster 2 - 02 - Don't call me Big Sis!.mkv"
mkvmerge -i "Gunbuster 2 - 03 - I hate Topless!.mkv"
mkvmerge -i "Gunbuster 2 - 04 - Resurrection! The Legendary Buster Machine!.mkv"
mkvmerge -i "Gunbuster 2 - 05 - They who move the Stars.mkv"
mkvmerge -i "Gunbuster 2 - 06 - The Story of Your Life.mkv"
mkvextract tracks "Gunbuster 2 - 01 - Please Let Me Call You Big Sister!.mkv" 2:"Gunbuster 2 - 01 - Please Let Me Call You Big Sister!.ssa"
mkvextract tracks "Gunbuster 2 - 02 - Don't call me Big Sis!.mkv" 2:"Gunbuster 2 - 02 - Don't call me Big Sis!.ssa"
mkvextract tracks "Gunbuster 2 - 03 - I hate Topless!.mkv" 2:"Gunbuster 2 - 03 - I hate Topless!.ssa"
mkvextract tracks "Gunbuster 2 - 04 - Resurrection! The Legendary Buster Machine!.mkv" 2:"Gunbuster 2 - 04 - Resurrection! The Legendary Buster Machine!.ssa"
mkvextract tracks "Gunbuster 2 - 05 - They who move the Stars.mkv" 2:"Gunbuster 2 - 05 - They who move the Stars.ssa"
mkvextract tracks "Gunbuster 2 - 06 - The Story of Your Life.mkv" 2:"Gunbuster 2 - 06 - The Story of Your Life.ssa"
https://superuser.com/questions/393762/how-to-extract-subtitles-from-mp4-and-mkv-movies

Convert .ass .srt to .vtt
https://subtitletools.com/convert-to-vtt-online/5b54e3f53391081d
https://github.com/pmdevita/SSA-ASStoVTT
python3 ssatovtt.py "Gunbuster 2 - 01 - Please Let Me Call You Big Sister!.ssa" "Gunbuster 2 - 01 - Please Let Me Call You Big Sister! 2.vtt"

:: Convert SRT/SSA/ASS/SMI/SUB to VTT
:: https://subtitletools.com/convert-to-vtt-online

:: Convert SUB/IDX to SRT
:: https://subtitletools.com/convert-sub-idx-to-srt-online
:: https://convert.jamack.net/en/
:: https://iamscum.wordpress.com/guides/ocr/ - https://www.nikse.dk/subtitleedit/

Extra MP4 from MKV using VLC
https://www.howtogeek.com/361973/how-to-convert-mkv-videos-to-mp4/
