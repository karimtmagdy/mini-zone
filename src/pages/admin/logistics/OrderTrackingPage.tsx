import {
  MapLibre,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from "@/components/ui/map";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/assets/icon/icons";

export default function OrderTrackingPage() {
  const activeDeliveries = [
    {
      id: "TRK-9901",
      customer: "Amr Khaled",
      lng: 31.2357,
      lat: 30.0444,
      status: "In Transit",
      driver: "Ahmed S.",
      vehicle: "Van #402",
    },
    {
      id: "TRK-5520",
      customer: "Nora Zein",
      lng: 29.9187,
      lat: 31.2001,
      status: "Out for Delivery",
      driver: "Mohamed H.",
      vehicle: "Bike #12",
    },
    {
      id: "TRK-1104",
      customer: "Sami Mansour",
      lng: 31.3285,
      lat: 31.042,
      status: "Near Destination",
      driver: "Sayed F.",
      vehicle: "Truck #88",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight italic">
            Real-time Command Hub
          </h1>
          <p className="text-muted-foreground">
            Monitor your global fleet and active fulfillment streams.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="success" className="gap-2">
            <Icon.ShieldCheckIcon className="h-3 w-3" /> System Online
          </Badge>
          <Badge variant="info" className="gap-2">
            Live Updates
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Statistics Cards */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <Icon.TruckIcon className="text-primary h-3.5 w-3.5" /> Active Fleet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic">42 / 50</div>
            <p className="text-muted-foreground mt-1 text-[10px]">
              Vehicles currently operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <Icon.PackageIcon className="h-3.5 w-3.5 text-blue-500" /> Pending Dispatch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic">14</div>
            <p className="text-muted-foreground mt-1 text-[10px]">
              Orders in queue for pickup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-muted-foreground flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
              <Icon.ClockIcon className="h-3.5 w-3.5 text-amber-500" /> Avg. Fulfillment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold italic">28 min</div>
            <p className="text-muted-foreground mt-1 text-[10px]">
              From capture to last mile
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/10 bg-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-600 uppercase">
              Status Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 italic">
              Peak
            </div>
            <p className="text-muted-foreground mt-1 text-[10px]">
              High efficiency operations
            </p>
          </CardContent>
        </Card>

        {/* Map View */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] overflow-hidden border-2 shadow-xl">
            <MapLibre
              viewport={{
                center: [31.2357, 30.0444],
                zoom: 6,
                bearing: 0,
                pitch: 0,
              }}
            >
              <MapControls showLocate showFullscreen />

              {activeDeliveries.map((delivery) => (
                <MapMarker
                  key={delivery.id}
                  longitude={delivery.lng}
                  latitude={delivery.lat}
                >
                  <MarkerContent>
                    <div className="group relative">
                      <div className="bg-primary flex h-10 w-10 animate-bounce items-center justify-center rounded-2xl shadow-xl ring-4 ring-white transition-all hover:scale-110">
                        <Icon.TruckIcon className="text-primary-foreground h-5 w-5" />
                      </div>
                      <div className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-emerald-500" />
                    </div>
                  </MarkerContent>
                  <MarkerPopup className="w-64 p-0">
                    <div className="bg-primary flex flex-col p-4 text-white">
                      <span className="text-[10px] font-bold tracking-tighter uppercase opacity-80">
                        Shipment ID
                      </span>
                      <span className="text-lg font-black tracking-tight italic">
                        {delivery.id}
                      </span>
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs font-medium">
                          Customer
                        </span>
                        <span className="text-sm font-bold">
                          {delivery.customer}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs font-medium">
                          Driver
                        </span>
                        <span className="text-sm font-bold">
                          {delivery.driver}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs font-medium">
                          Vehicle
                        </span>
                        <Badge
                          variant="outline"
                          className="font-mono text-[10px]"
                        >
                          {delivery.vehicle}
                        </Badge>
                      </div>
                      <div className="border-t pt-3">
                        <Badge
                          className="w-full justify-center py-1 font-bold italic"
                          variant={
                            delivery.status === "Delivered" ? "success" : "info"
                          }
                        >
                          {delivery.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              ))}
            </MapLibre>
          </Card>
        </div>

        {/* Sidebar Status Feed */}
        <div className="space-y-4">
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase italic">
                Live Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  time: "12:04",
                  msg: "TRK-9901 entered Cairo Sector",
                  type: "info",
                },
                {
                  time: "11:58",
                  msg: "TRK-5520 delayed (Heavy Traffic)",
                  type: "warning",
                },
                {
                  time: "11:45",
                  msg: "TRK-1104 marked as Near Destination",
                  type: "success",
                },
                {
                  time: "11:30",
                  msg: "Fleet dispatch alpha complete",
                  type: "info",
                },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-xs leading-relaxed">
                  <span className="text-muted-foreground font-mono font-bold">
                    {log.time}
                  </span>
                  <p className="font-medium">{log.msg}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/20">
            <CardContent className="p-6">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md">
                <Icon.ShieldCheckIcon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold italic">Secure Tracking</h3>
              <p className="text-xs leading-relaxed text-indigo-100 opacity-80">
                All logistical data is encrypted. Your fleet positioning is only
                visible to authorized command personnel.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
