
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DustToken } from "@/lib/types";

interface DustTokenListProps {
  tokens: DustToken[];
  selectedTokens: string[];
  onTokenSelect: (tokenId: string) => void;
}

export const DustTokenList = ({ tokens, selectedTokens, onTokenSelect }: DustTokenListProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  
  // Filter tokens based on search query and chain filter
  const filteredTokens = tokens.filter(token => {
    const matchesSearch = token.symbol.toLowerCase().includes(search.toLowerCase()) || 
                          token.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filter || token.chain === filter;
    return matchesSearch && matchesFilter;
  });
  
  // Get unique chains for filter
  const uniqueChains = Array.from(new Set(tokens.map(token => token.chain)));
  
  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tokens..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 overflow-x-auto pb-1">
          <Badge
            variant={filter === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setFilter(null)}
          >
            All Chains
          </Badge>
          {uniqueChains.map(chain => (
            <Badge
              key={chain}
              variant={filter === chain ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setFilter(chain === filter ? null : chain)}
            >
              {chain}
            </Badge>
          ))}
        </div>
      </div>

      {/* Tokens table */}
      <div className="rounded-md border glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead className="text-right">Balance</TableHead>
              <TableHead className="text-right">Value (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTokens.includes(token.id)}
                      onCheckedChange={() => onTokenSelect(token.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                        {token.symbol.charAt(0)}
                      </div>
                      <div>
                        <div>{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`bg-web3-${token.chain.toLowerCase()}/10`}>
                      {token.chain}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {token.balance} {token.symbol}
                  </TableCell>
                  <TableCell className="text-right">
                    ${token.usdValue.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No dust tokens found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
