"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  Coins,
  Wallet,
  Plus,
  ImageIcon,
  Video,
  Sparkles,
  ShoppingCart,
  Eye,
  TrendingUp,
} from "lucide-react"

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  isNFT: boolean
  nftPrice?: string
  nftOwner?: string
  liked: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      username: "alexchen.fuel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "Just minted my first post as an NFT on Fuel! 🚀 The future of social media is here. Who wants to collect this moment?",
    image: "/placeholder.svg?height=300&width=500",
    timestamp: "2h",
    likes: 234,
    comments: 45,
    shares: 12,
    isNFT: true,
    nftPrice: "0.5 ETH",
    nftOwner: "alexchen.fuel",
    liked: false,
  },
  {
    id: "2",
    author: {
      name: "Sarah Kim",
      username: "sarahk.fuel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    content:
      "Building the next generation of decentralized apps on Fuel Network. The speed and efficiency is incredible! 💡",
    timestamp: "4h",
    likes: 156,
    comments: 23,
    shares: 8,
    isNFT: false,
    liked: true,
  },
  {
    id: "3",
    author: {
      name: "Mike Rodriguez",
      username: "mikerod.fuel",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    content:
      "GM Web3 fam! ☀️ Another day, another opportunity to revolutionize social media. What are you building today?",
    image: "/placeholder.svg?height=200&width=400",
    timestamp: "6h",
    likes: 89,
    comments: 34,
    shares: 15,
    isNFT: true,
    nftPrice: "0.2 ETH",
    nftOwner: "collector.fuel",
    liked: false,
  },
]

export default function FuelSocialPlatform() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleMintNFT = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, isNFT: true, nftPrice: "0.3 ETH", nftOwner: "you.fuel" } : post,
      ),
    )
  }

  const createPost = () => {
    if (!newPost.trim()) return

    const post: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        username: "you.fuel",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
      },
      content: newPost,
      timestamp: "now",
      likes: 0,
      comments: 0,
      shares: 0,
      isNFT: false,
      liked: false,
    }

    setPosts([post, ...posts])
    setNewPost("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FuelSocial
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="hidden sm:flex">
                <TrendingUp className="w-3 h-3 mr-1" />
                Fuel Network
              </Badge>

              {isConnected ? (
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>YU</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:block">you.fuel</span>
                </div>
              ) : (
                <Button
                  onClick={() => setIsConnected(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <h3 className="font-semibold">NFT Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total NFTs</span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Volume</span>
                  <span className="font-medium">45.6 ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Floor Price</span>
                  <span className="font-medium">0.1 ETH</span>
                </div>
                <Separator />
                <Button variant="outline" className="w-full bg-transparent">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Browse Marketplace
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            {isConnected && (
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>YU</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Share your thoughts</p>
                      <p className="text-sm text-muted-foreground">Create a post that can be minted as NFT</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="What's happening in Web3?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button onClick={createPost} disabled={!newPost.trim()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{post.author.name}</p>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            @{post.author.username} · {post.timestamp}
                          </p>
                        </div>
                      </div>

                      {post.isNFT && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                          <Coins className="w-3 h-3 mr-1" />
                          NFT
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm leading-relaxed mb-4">{post.content}</p>

                    {post.image && (
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Post content"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {post.isNFT && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">NFT Details</p>
                            <p className="text-xs text-muted-foreground">Price: {post.nftPrice}</p>
                            <p className="text-xs text-muted-foreground">Owner: @{post.nftOwner}</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-2" />
                            View NFT
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-6">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.liked ? "text-red-500" : ""}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${post.liked ? "fill-current" : ""}`} />
                          {post.likes}
                        </Button>

                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          {post.comments}
                        </Button>

                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          {post.shares}
                        </Button>
                      </div>

                      {!post.isNFT && isConnected && (
                        <Button
                          size="sm"
                          onClick={() => handleMintNFT(post.id)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          <Coins className="w-4 h-4 mr-2" />
                          Mint NFT
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Trending NFTs */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Trending NFTs</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Post #{i}</p>
                        <p className="text-xs text-muted-foreground">0.{i} ETH</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Suggested Users */}
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Who to Follow</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["fuel.dev", "web3builder", "nftcreator"].map((username) => (
                    <div key={username} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">@{username}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Follow
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
