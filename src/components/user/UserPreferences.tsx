import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { getSources as getNewsApiSources } from "@/services/newsApi";
import { getSections as getGuardianSections } from "@/services/guardianApi";
import { getSections as getNYTimesSections } from "@/services/nytimesApi";
import { usePreferences } from "@/hooks/usePreference";
import { Category, Source } from "@/types/article";

const UserPreferences = () => {
  const { toast } = useToast();
  const {
    preferredSources,
    preferredCategories,
    preferredAuthors,
    setPreferredSources,
    setPreferredCategories,
    setPreferredAuthors,
    resetPreferences,
  } = usePreferences();

  // Local state for form values
  const [selectedSources, setSelectedSources] =
    useState<string[]>(preferredSources);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(preferredCategories);
  const [selectedAuthors, setSelectedAuthors] =
    useState<string[]>(preferredAuthors);

  // Update local state when preferences change
  useEffect(() => {
    setSelectedSources(preferredSources);
    setSelectedCategories(preferredCategories);
    setSelectedAuthors(preferredAuthors);
  }, [preferredSources, preferredCategories, preferredAuthors]);

  // Fetch sources from NewsAPI
  const { data: newsSources = [] } = useQuery({
    queryKey: ["news-sources"],
    queryFn: () => getNewsApiSources(),
  });

  // Fetch sections from The Guardian
  const { data: guardianSections = [] } = useQuery({
    queryKey: ["guardian-sections"],
    queryFn: () => getGuardianSections(),
  });

  // Fetch sections from NY Times
  const { data: nytimesSections = [] } = useQuery({
    queryKey: ["nytimes-sections"],
    queryFn: () => getNYTimesSections(),
  });

  // Combine sources and categories from all APIs
  const sources = newsSources.concat([
    { id: "the-guardian", name: "The Guardian" },
    { id: "new-york-times", name: "New York Times" },
  ]);

  // Create a unique list of categories
  const uniqueCategories = new Map();

  // Add NY Times sections
  nytimesSections.forEach((section) => {
    uniqueCategories.set(section.id, section);
  });

  // Add Guardian sections
  guardianSections.forEach((section: Category) => {
    uniqueCategories.set(section.id, section);
  });

  // Convert Map to array
  const categories = Array.from(uniqueCategories.values());

  // Handle source toggle
  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  // Handle category toggle
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    setPreferredSources(selectedSources);
    setPreferredCategories(selectedCategories);
    setPreferredAuthors(selectedAuthors);

    toast({
      title: "Preferences saved",
      description:
        "Your preferences have been saved and will be applied to your feed.",
      duration: 3000,
    });
  };

  // Handle reset preferences
  const handleResetPreferences = () => {
    resetPreferences();

    toast({
      title: "Preferences reset",
      description: "Your preferences have been reset to default.",
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Personalize Your News Feed</CardTitle>
          <CardDescription>
            Select your preferred sources, categories, and authors to customize
            your news feed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sources" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="authors">Authors</TabsTrigger>
            </TabsList>

            <TabsContent value="sources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sources.map((source: Source) => (
                  <div key={source.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`source-${source.id}`}
                      checked={selectedSources.includes(source.id)}
                      onCheckedChange={() => handleSourceToggle(source.id)}
                    />
                    <Label
                      htmlFor={`source-${source.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {source.name}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="authors" className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Author preferences will be automatically updated based on the
                  articles you read.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleResetPreferences}
              className="flex items-center"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reset Preferences
            </Button>

            <Button
              onClick={handleSavePreferences}
              className="flex items-center"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserPreferences;
