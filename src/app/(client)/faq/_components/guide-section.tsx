import { faq1, faq2, faq3, faq4, faq5, faq6, faq7, faq8, faq9, faq10, faq11 } from '@/assets/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import Image from 'next/image';

export default function GuideSection() {
  return (
    <section className='w-full max-w-4xl mx-auto'>
      <Accordion type="multiple" className="w-full space-y-8 mt-4 md:mt-8">
        <AccordionItem value={`guide-1`}>
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">Finding a playlist? Here is our suggestion</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='py-4'>
            <div className="text-white text-lg space-y-8 px-4">
              <p>Here are sites where you can pick your favorite IPTV links:
                <Link href="https://theipfire.com/iptv-m3u-playlist-links/" className="text-blue-400 hover:text-blue-300 underline ml-1">
                  https://theipfire.com/iptv-m3u-playlist-links/
                </Link> or
                <Link href="http://tonkiang.us/" className="text-blue-400 hover:text-blue-300 underline ml-1">
                  http://tonkiang.us/
                </Link> to search a specific link to import or any links with the format of m3u such as NASA m3u, BBC m3u
              </p>
              <p><strong className='text-primary'>Notes:</strong> Please be advised that our app is not affiliated with any party, and therefore, the links we suggest are for reference purposes only. Kindly note that there is no guarantee that the link will always work properly.</p>
              <p className="text-primary italic font-medium">*Here is how you find a playlist/channel link to import to the app:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Click on the &quot;How to Add a Playlist&quot; button on the home app screen</li>
                <li>Click Search Public IPTV Playlist</li>
                <li>The app will open on your browser and you can search for any IPTV links</li>
                <li>Copy the m3u playlist link or download the file</li>
                <li>Return to the app and click the &quot;Add playlist&quot; or &quot;+&quot; button. Select &quot;Import Playlist URL&quot; and paste the link</li>
              </ol>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq1} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`guide-2`}>
          <AccordionTrigger>
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">How to add an IPTV playlist?</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='py-4'>
            <div className="text-white text-lg space-y-8 px-4">
              <p>You can easily follow these steps to copy an appropriate link from the internet and import it to our app to enjoy your favorite shows:</p>
              <p className='text-primary'>To import a file on the Home app screen, simply tap the &quot;+&quot; button.</p>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq2} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
              <p className='text-primary'>Select the source from which you would like to import a link.</p>
              <p className='text-primary'>*Please be aware that the imported link must be in the format of an m3u URL</p>
              <ol className="list-disc list-inside space-y-2 ml-4">
                <li className='italic'><strong className='text-primary font-bold not-italic'>Import Playlist URL:</strong> search, copy, and paste a playlist link from the Internet browser.</li>
                <li className='italic'><strong className='text-primary font-bold not-italic'>Upload M3U File:</strong> transfer your M3U files from your phone to the app. The accepted file format is .m3u, .m3u8 with a maximum of 5 file uploads.</li>
                <li className='italic'><strong className='text-primary font-bold not-italic'>Import from the device:</strong> upload your videos located on your device. This file cannot be opened if the videos got misplaced or removed.</li>
                <li className='italic'><strong className='text-primary font-bold not-italic'>Play Single Stream:</strong> support network protocols such as HTTP, FTP, RTSP, RTP, UDP,...</li>
              </ol>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq3} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className='font-bold text-primary'>A. Import Playlist URL</h4>
                <p className='italic font-light'>If you are looking to import a new IPTV link and are unaware of how to do it, please follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>On the home app screen, simply tap the &quot;+&quot; button.</li>
                  <li>Choose the method of <strong className='text-primary'>Import Playlist URL</strong></li>
                  <li>Tap <strong className='text-primary'>Confirm</strong> and <strong className='text-primary'>Accept</strong> the License Agreement (just once time when you first import a link)</li>
                  <li>Place the link to the <strong className='text-primary'>Playlist URL</strong> and give it a name in the <strong className='text-primary'>Playlist Name</strong> section</li>
                  <li><strong className='text-primary'>Set Password</strong> Security to make your playlist private (optional)</li>
                  <li>Tap to <strong className='text-primary'>Save</strong>, and wait for a second to watch your show!</li>
                </ol>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq4} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className='font-bold text-primary'>B. Upload M3U File</h4>
                <p className='italic font-light'>If you have the media formatted in M3U files from your phone and want to upload it to the app, please follow these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>On the home app screen, simply tap the &quot;+&quot; button.</li>
                  <li>Choose the option of <strong className='text-primary'>Upload M3U File</strong></li>
                  <li>Grant file access permissions</li>
                  <li>Tap to <strong className='text-primary'>Select file to upload</strong> and select your files to upload</li>
                  <li>Name your playlist, set its passcode (optional) then tap <strong className='text-primary'>Save</strong></li>
                </ol>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq5} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className='font-bold text-primary'>C. Import from Device</h4>
                <p className='italic font-light'>Wanna upload videos located on your device? Make sure that you complete these steps:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>On the Home app screen, simply tap the &quot;+&quot; button.</li>
                  <li>Choose the option of <strong className='text-primary'>Import from Device</strong></li>
                  <li>Scroll and select the videos you want to upload -&gt; Tap <strong className='text-primary'>Add</strong> to continue</li>
                  <li>Name your playlist, set its passcode (optional) then tap <strong className='text-primary'>Save</strong></li>
                </ol>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq6} alt="Import from Device" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className='font-bold text-primary'>D. Play Single Stream</h4>
                <p className='italic font-light'>Follow these simple steps to enjoy uninterrupted live streaming of your IPTV events on your device.</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>On the Home app screen, simply tap the &quot;+&quot; button.</li>
                  <li>Choose the option of <strong className='text-primary'>Play Single Stream</strong></li>
                  <li>Import your link at the Stream Link section -&gt; Tap <strong className='text-primary'>Play</strong> to continue</li>
                  <li>Now you can enjoy the show!</li>
                </ol>
                <p className='italic font-light'>Please not that our app only support network protocols such as HTTP, FTP, RTSP, RTP, UDP, ....</p>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq7} alt="Play Single Stream" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className='font-bold text-primary'>E. Import Xtream Code API</h4>
                <p className='italic font-light'>Follow these simple steps to enjoy uninterrupted live streaming of your IPTV events on your device.</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>On the Home app screen, simply tap the &quot;+&quot; button.</li>
                  <li>Choose the option of <strong className='text-primary'>Import Xtream Code API</strong></li>
                  <li><strong className='text-primary'>Add Profile</strong> and <strong className='text-primary'>Fill</strong> in information</li>
                  <li><strong className='text-primary'>Select</strong> the Profile you just created</li>
                  <li>Now you can enjoy the show!</li>
                </ol>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq8} alt="Play Single Stream" height={500} width={500} className="w-full" />
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq9} alt="Play Single Stream" height={500} width={500} className="w-full" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`guide-3`}>
          <AccordionTrigger className="hover:no-underline px-4 bg-[#1B1B1E] data-[state=open]:bg-primary transition-colors">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">Why cannot the app play my playlist or channel?</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='pt-4 pb-0'>
            <div className="text-white text-lg space-y-8 px-4">
              <p>Having trouble when importing a playlist or adding a channel with the IPTV app? Here are some <strong className='text-primary'>possible reasons</strong> why the app is unable to play or stream your imported playlists or channels:</p>
              <ol className="list-disc list-inside space-y-2 ml-4">
                <li>The playlist or channel link may be incorrect or outdated</li>
                <li>The playlist or channel is temporarily out of service or not available in your region</li>
                <li>Your internet connection may be unstable or too slow to support streaming</li>
              </ol>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq10} alt="Playlist Guide" height={500} width={500} className="w-full" />
              </div>
              <p>Here are some <strong className="text-primary">troubleshooting tips</strong> that you can try if you are experiencing issues with adding or importing a playlist or channel when using our IPTV app:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Ensure that you have a stable internet connection</li>
                <li>Check that the playlist or channel URL is correct and valid</li>
                <li>Try clearing the app cache and data, then restart the app</li>
                <li>Make sure that your device&apos;s operating system and the app are up to date</li>
                <li>Try using a different device to see if the issue persists</li>
                <li>Contact our customer support team for further assistance</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={`guide-4`} >
          <AccordionTrigger className="hover:no-underline px-4 bg-[#1B1B1E] data-[state=open]:bg-primary transition-colors">
            <div className="flex items-center justify-between w-full pr-4">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-semibold text-white">Edit, delete a playlist or set it private</h3>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='py-4'>
            <div className="text-white text-lg space-y-8 px-4">
              <p>If you&apos;ve imported a playlist and want to edit its name, copy the URL to share with your friends, set it private, or delete it, follow our guidelines below.</p>
              <div className='space-y-5'>
                <h4 className="text-primary font-semibold text-xl">1. Edit playlist</h4>
                <p className="italic">Easily rename your playlist, copy the URL, or make it private by:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Select the playlist you want to modify -&gt; Tap the three-dot button</li>
                  <li>Go to <strong className="text-primary">Edit playlist</strong></li>
                  <li>Place the cursor on the <strong className="text-primary">Playlist Name</strong> section to change its title</li>
                  <li>Tap on the Copy button in the <strong className="text-primary">Playlist URL</strong> section to copy the link</li>
                  <li>Toggle on the <strong className="text-primary">Set Passcode Security</strong> button to make your playlist private</li>
                  <li>Tap on the <strong className="text-primary">&quot;Save&quot; button</strong> to ensure that your changes are saved</li>
                </ol>
              </div>
              <div className='max-w-80 mx-auto shadow-md shadow-[#2D2D30] rounded-lg overflow-hidden'>
                <Image src={faq11} alt="Edit Playlist" height={500} width={500} className="w-full" />
              </div>
              <div className='space-y-5'>
                <h4 className="text-primary font-semibold text-xl">2. Delete playlist</h4>
                <p>If you have lost interest in a playlist and wish to remove it, tap the three-dot button on the right-hand side of the playlist on the app&apos;s Home Screen. This will allow you to select the playlist you wish to modify, and then proceed with the button <strong className="text-primary">Delete playlist</strong>. Confirm to delete the playlist forever by choosing <strong className="text-primary">Delete</strong>.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}