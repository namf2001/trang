import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

export default function ExampleSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className='text-[28px] font-bold text-white uppercase'>sample url</h2>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        {/* Left Column */}
        <div className="space-y-6 sm:space-y-8">
          {/* M3U8 Playlist URL Card */}
          <Card className="bg-[#73737c33] backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                M3U8 Playlist URL
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 sm:gap-4">
              <Input
                type="text"
                value="http://m3u.sstv.one:80"
                readOnly
                className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 w-full"
              />
              <Button
                className="bg-primary-foreground hover:bg-orange-600 text-white text-sm sm:text-base lg:text-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                size="lg"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Copied
              </Button>
            </CardContent>
          </Card>

          {/* Sports Playlist URL Card */}
          <Card className="bg-[#73737c33] backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-white text-lg sm:text-xl">
                Sports Playlist URL
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3 sm:gap-4">
              <Input
                type="text"
                value="http://m3u.sstv.one:80"
                readOnly
                className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 w-full"
              />
              <Button
                className="bg-primary-foreground hover:bg-orange-600 text-white text-sm sm:text-base lg:text-lg w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3"
                size="lg"
              >
                <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Copy
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Xtream Code API */}
        <Card className="bg-[#73737c33] backdrop-blur-md rounded-xl border border-white/20 px-3 sm:px-4">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-white text-lg sm:text-xl">
              Xtream Code API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6">
            {/* URL Field */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-white text-xs sm:text-sm">
                URL
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="url"
                  type="text"
                  value="http://m3u.sstv.one:80"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 flex-1"
                />
                <Button
                  className="bg-primary-foreground hover:bg-orange-600 text-white p-3 sm:p-4 lg:p-6 w-full sm:w-auto text-xs sm:text-sm lg:text-base"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white text-xs sm:text-sm">
                Username
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="username"
                  type="text"
                  value="NUTV"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 flex-1"
                />
                <Button
                  className="bg-primary-foreground hover:bg-orange-600 text-white p-3 sm:p-4 lg:p-6 w-full sm:w-auto text-xs sm:text-sm lg:text-base"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-xs sm:text-sm">
                Password
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  id="password"
                  type="text"
                  value="148579044"
                  readOnly
                  className="bg-[#1B1B1E] text-white text-sm sm:text-base lg:text-lg border-0 py-3 sm:py-4 lg:py-6 flex-1"
                />
                <Button
                  className="bg-primary-foreground hover:bg-orange-600 text-white p-3 sm:p-4 lg:p-6 w-full sm:w-auto text-xs sm:text-sm lg:text-base"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
