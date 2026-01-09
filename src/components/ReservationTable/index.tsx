import { useState, useMemo } from "react";
import Fuse from "fuse.js";

import { Reservation } from "@/types";
import { Text } from "@/components/Text";
import { cx } from "@/helpers";
import { Button } from "@/components/Button";

import sharedStyles from "@/styles/shared.module.scss";

interface ReservationsTableProps {
  reservations?: Reservation[];
}

type SortField = "type" | "instance" | "endDate" | "costPerHour" | "mtdSavings";
type SortDirection = "asc" | "desc";

export const ReservationsTable = ({ reservations }: ReservationsTableProps) => {
  const [sortField, setSortField] = useState<SortField>("endDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [pageSize, setPageSize] = useState(20);
  const [isPending, setIsPending] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const { displayedReservations, hasMore } = useMemo(() => {
    if (!reservations) return { displayedReservations: [], hasMore: false };

    // Sort
    const sorted = [...reservations].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "endDate") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Filter
    let filtered = sorted;
    if (searchInput) {
      const fuse = new Fuse(sorted, {
        location: 0,
        threshold: 0.3,
        keys: ["type", "instance"],
      });
      filtered = fuse.search(searchInput).map((result) => result.item);
    }

    // Paginate only when not searching
    const displayed = searchInput ? filtered : filtered.slice(0, pageSize);
    const hasMore = !searchInput && filtered.length > pageSize;

    return { displayedReservations: displayed, hasMore };
  }, [reservations, sortField, sortDirection, searchInput, pageSize]);

  const handleLoadMore = () => {
    setIsPending(true);
    setTimeout(() => {
      setPageSize((prev) => prev + 20);
      setIsPending(false);
    }, 280);
  };

  if (!reservations) {
    return (
      <div className="rounded-2xl border border-web-border bg-web-content">
        <div className="border-b border-web-border px-6 py-4">
          <div className="h-6 w-56 animate-pulse rounded bg-web-content-dim" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-web-border">
                <th className="px-6 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-web-content-dim" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-web-content-dim" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-web-content-dim" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-web-content-dim" />
                </th>
                <th className="px-6 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-web-content-dim" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-web-border">
                  <td className="px-6 py-4">
                    <div className="h-4 w-32 animate-pulse rounded bg-web-content-dim" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 animate-pulse rounded bg-web-content-dim" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-28 animate-pulse rounded bg-web-content-dim" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 animate-pulse rounded bg-web-content-dim" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-20 animate-pulse rounded bg-web-content-dim" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <Text as="span">⇅</Text>;
    }
    return <Text as="span">{sortDirection === "asc" ? "↑" : "↓"}</Text>;
  };

  return (
    <>
      <div className="rounded-2xl border border-web-border bg-web-content">
        <div className="border-b border-web-border px-6 py-4">
          <Text as="h2" size="xl" variant="primary" leading="tight">
            Reservations & Savings Plans
          </Text>

          <input
            className={cx(
              sharedStyles.interactive,
              "mt-3 w-full px-3 py-1 border bg-web-content border-web-border focus:border-web-primary rounded-lg placeholder-web-readable-dim text-web-readable"
            )}
            placeholder="Search reservations..."
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort("type")}
                    className={cx(
                      "flex items-center gap-1",
                      sharedStyles.interactive
                    )}
                  >
                    <Text as="span" size="sm" weight="medium">
                      Type
                    </Text>{" "}
                    <SortIcon field="type" />
                  </button>
                </th>
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort("instance")}
                    className={cx(
                      "flex items-center gap-1",
                      sharedStyles.interactive
                    )}
                  >
                    <Text as="span" size="sm" weight="medium">
                      Instance
                    </Text>{" "}
                    <SortIcon field="instance" />
                  </button>
                </th>
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort("endDate")}
                    className={cx(
                      "flex items-center gap-1",
                      sharedStyles.interactive
                    )}
                  >
                    <Text as="span" size="sm" weight="medium">
                      End Date
                    </Text>{" "}
                    <SortIcon field="endDate" />
                  </button>
                </th>
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort("costPerHour")}
                    className={cx(
                      "flex items-center gap-1",
                      sharedStyles.interactive
                    )}
                  >
                    <Text as="span" size="sm" weight="medium">
                      Cost/Hr
                    </Text>{" "}
                    <SortIcon field="costPerHour" />
                  </button>
                </th>
                <th className="px-6 py-3">
                  <button
                    onClick={() => handleSort("mtdSavings")}
                    className={cx(
                      "flex items-center gap-1",
                      sharedStyles.interactive
                    )}
                  >
                    <Text as="span" size="sm" weight="medium">
                      MTD Savings
                    </Text>{" "}
                    <SortIcon field="mtdSavings" />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedReservations.map((reservation, idx) => {
                const savingsSign = reservation.mtdSavings >= 0 ? "+" : "-";

                return (
                  <tr
                    key={reservation.id}
                    className={cx(
                      idx === displayedReservations.length - 1
                        ? ""
                        : "border-b border-web-border"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Text as="span" size="sm">
                          {reservation.type}
                        </Text>
                        {reservation.managedByNorth && (
                          <Text
                            as="span"
                            size="2xs"
                            weight="medium"
                            className="rounded-full bg-web-primary-dim px-1.5 py-0.5"
                          >
                            Managed
                          </Text>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Text as="span" size="sm">
                        {reservation.instance}
                      </Text>
                    </td>
                    <td className="px-6 py-4">
                      <Text as="span" size="sm">
                        {formatDate(reservation.endDate)}
                      </Text>
                    </td>
                    <td className="px-6 py-4">
                      <Text as="span" size="sm">
                        ${reservation.costPerHour.toFixed(2)}
                      </Text>
                    </td>
                    <td className="px-6 py-4">
                      <Text
                        as="span"
                        size="sm"
                        weight="medium"
                        className={cx(
                          reservation.mtdSavings >= 0
                            ? "text-web-success"
                            : "text-web-danger"
                        )}
                      >
                        {savingsSign}$
                        {Math.abs(reservation.mtdSavings).toFixed(2)}
                      </Text>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {hasMore && (
        <div className="flex justify-center w-full">
          <Button
            onClick={handleLoadMore}
            pending={isPending}
            className="w-full"
          >
            <Text as="span">Load More</Text>
          </Button>
        </div>
      )}
    </>
  );
};
