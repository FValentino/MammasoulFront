import { getAllcategories } from "../../services/categoryService";
import Card from "../../components/categories/categoryCard"
import BackButton from "../../components/ui/backButton";

export default function Categories() {

  const categories = getAllcategories();

  return (
    <section className="container mx-auto p-4">
      <div className="w-full flex justify-start items-center mb-4">
        <BackButton />
        <h2 className="ms-4 text-2xl font-bold">Categorias</h2>
      </div>
      {
        categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="col-span-1">
                <Card category={category} />
              </div>
            ))}
          </div>
        ) : (
          <p>No hay categorías disponibles.</p>
        )
      }
    </section>
  )
}   